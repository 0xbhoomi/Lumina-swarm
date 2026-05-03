async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  const Executor = await ethers.getContractFactory("Executor");
  const exe = await Executor.deploy();
  await exe.deployed();

  console.log("Executor deployed to:", exe.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
