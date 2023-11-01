import "@stdlib/deploy";
import "@stdlib/ownable";

contract GymLibPaymentMaster with Deployable, Ownable {
    owner: Address;
    init(owner: Address){
        self.owner = owner;
    }
}