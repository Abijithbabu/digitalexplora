function Memeber({ member }) {
  return (
    <div className="mt-4 text-center speaker rounded-lg shadow-lg md:rounded-none md:shadow-none">
      <img
        src={member.image}
        alt={member.fullName}
        width="100%"
        height="auto"
      />
      <h3 className="text-gray-900 font-bold mt-4">{member.fullName}</h3>
      <p className="text-gray-800 mb-4">{member.designation}</p>
      <img src={member.logo} alt={member.fullName} className="w-32 mx-auto" />
    </div>
  );
}

export default Memeber;
