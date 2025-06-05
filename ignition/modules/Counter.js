const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CounterModule", (m) => {
  const initialNumber = m.getParameter("initialNumber", 0);
  
  const counter = m.contract("Counter", []);
  
  if (initialNumber !== 0) {
    m.call(counter, "setNumber", [initialNumber]);
  }

  return { counter };
});
