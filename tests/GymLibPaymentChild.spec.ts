import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { GymLibPaymentChild } from '../wrappers/GymLibPaymentChild';
import '@ton-community/test-utils';

describe('GymLibPaymentChild', () => {
    let blockchain: Blockchain;
    let gymLibPaymentChild: SandboxContract<GymLibPaymentChild>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        gymLibPaymentChild = blockchain.openContract(await GymLibPaymentChild.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await gymLibPaymentChild.send(
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
            to: gymLibPaymentChild.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and gymLibPaymentChild are ready to use
    });
});
