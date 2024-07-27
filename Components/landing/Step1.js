function Step1({ handleChange, state, refMessage }) {
  if (state.currentStep !== 1) {
    return null;
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-4">
      <div>
        <input
          type="text"
          className="field2"
          name="firstName"
          placeholder="First name..."
          value={state.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          className="field2"
          name="lastName"
          placeholder="Last name..."
          value={state.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          className="field2"
          name="userName"
          placeholder="Username..."
          value={state.userName}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <input
          type="text"
          className="field2"
          name="email"
          placeholder="Email id..."
          value={state.email}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="password"
          className="field2"
          name="password"
          placeholder="Password..."
          value={state.password}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          className="field2"
          name="number"
          placeholder="Phone number..."
          value={state.number}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6 col-span-2">
        <input
          type="text"
          className="field2"
          name="referalId"
          placeholder="Referal ID..."
          value={state.referalId}
          onChange={handleChange}
        />

        {refMessage.sc && (
          <p className="text-xs text-green-500 p-1">{refMessage.sc}</p>
        )}
        {refMessage.er && (
          <p className="text-xs text-red-500 p-1">{refMessage.er}</p>
        )}
      </div>
    </div>
  );
}

export default Step1;
