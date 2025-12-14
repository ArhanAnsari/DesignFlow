import Image from "next/image";

const Companies = () => {
  return (
    <section
      id="partners"
      className="py-16 flex flex-col items-center gap-8 px-4 text-center font-space"
    >
      <p className="text-xl md:text-2xl font-medium max-w-2xl text-color-gray-700 text-black">
        Trusted by over 14,540 businesses to enhance learning and drive
        educational growth.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Image
            key={n}
            src={`/image ${n}.png`}
            alt="Company Logo"
            width={120}
            height={40}
            className="object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default Companies;
