import "@stdlib/deploy";

contract GymLibPaymentChild with Deployable {
    parrent: Address;
    init(parrent: Address){
        self.parrent = parrent;
    }
}