import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { GymLibPaymentMaster } from '../wrappers/GymLibPaymentMaster';
import '@ton-community/test-utils';

describe('GymLibPaymentMaster', () => {
    let blockchain: Blockchain;
    let gymLibPaymentMaster: SandboxContract<GymLibPaymentMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        gymLibPaymentMaster = blockchain.openContract(await GymLibPaymentMaster.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await gymLibPaymentMaster.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: gymLibPaymentMaster.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and gymLibPaymentMaster are ready to use
    });
});
