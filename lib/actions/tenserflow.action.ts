import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";

/**
 * Run pose estimation on a video and return basic feedback
 * @param videoElement HTMLVideoElement (the uploaded video)
 */
export async function getFeedback(videoElement: HTMLVideoElement) {
  // Load the MoveNet pose detection model
  const detector = await posedetection.createDetector(
    posedetection.SupportedModels.MoveNet,
    { modelType: "SinglePose.Lightning" }
  );

  const feedback: string[] = [];

  // Process every X frames
  const frameInterval = 10; // adjust for speed vs accuracy
  let frameCount = 0;

  // Create a hidden canvas to extract frames
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  return new Promise<string[]>((resolve) => {
    videoElement.currentTime = 0;

    videoElement.onseeked = async () => {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const inputImage = tf.browser.fromPixels(canvas);
      const poses = await detector.estimatePoses(inputImage);

      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        // Example: simple squat feedback
        const leftKnee = keypoints.find((k) => k.name === "left_knee");
        const leftHip = keypoints.find((k) => k.name === "left_hip");
        const leftAnkle = keypoints.find((k) => k.name === "left_ankle");

        if (leftKnee && leftHip && leftAnkle) {
          const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

          if (kneeAngle > 100) {
            feedback.push("Try squatting deeper for full range of motion.");
          } else {
            feedback.push("Good squat depth 👍");
          }
        }
      }

      frameCount++;
      if (
        frameCount * frameInterval <
        videoElement.duration * videoElement.frameRate
      ) {
        videoElement.currentTime += frameInterval / videoElement.frameRate;
      } else {
        resolve(feedback);
      }
    };
  });
}

// Utility: calculate angle between 3 points
function calculateAngle(a: any, b: any, c: any) {
  const AB = { x: a.x - b.x, y: a.y - b.y };
  const CB = { x: c.x - b.x, y: c.y - b.y };

  const dot = AB.x * CB.x + AB.y * CB.y;
  const magAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
  const magCB = Math.sqrt(CB.x * CB.x + CB.y * CB.y);

  const angle = Math.acos(dot / (magAB * magCB));
  return (angle * 180) / Math.PI; // in degrees
}
