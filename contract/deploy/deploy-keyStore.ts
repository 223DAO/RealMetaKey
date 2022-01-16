import { NFT_CONTRACT_ADDRESS } from './contracts';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('KeyStore', {
    from: deployer,
    args: [NFT_CONTRACT_ADDRESS],
    log: true,
  });
};

export default func;
func.tags = ['KeyStore'];
