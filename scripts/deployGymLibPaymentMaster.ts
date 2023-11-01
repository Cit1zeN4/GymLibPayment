import { toNano } from 'ton-core';
import { GymLibPaymentMaster } from '../wrappers/GymLibPaymentMaster';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const gymLibPaymentMaster = provider.open(await GymLibPaymentMaster.fromInit());

    await gymLibPaymentMaster.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(gymLibPaymentMaster.address);

    // run methods on `gymLibPaymentMaster`
}
