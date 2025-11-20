const Stats = () => {
  return (
    <section
      id="why-us"
      className="py-20 px-4 flex justify-center items-center font-space"
    >
      <div className="w-full max-w-6xl rounded-xl bg-[url('/image%207.png')] bg-cover bg-center text-white p-10 md:p-20">

        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Empowering Growth and Innovation with Cutting-Edge Technology Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h1 className="text-5xl font-bold">2468+</h1>
            <p className="text-xl">Pro Users</p>
          </div>
          <div>
            <h1 className="text-5xl font-bold">297+</h1>
            <p className="text-xl">Customers Managed</p>
          </div>
          <div>
            <h1 className="text-5xl font-bold">20,000+</h1>
            <p className="text-xl">Leads Found</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;
