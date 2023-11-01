import { toNano } from 'ton-core';
import { GymLibPaymentChild } from '../wrappers/GymLibPaymentChild';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const gymLibPaymentChild = provider.open(await GymLibPaymentChild.fromInit());

    await gymLibPaymentChild.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(gymLibPaymentChild.address);

    // run methods on `gymLibPaymentChild`
}
