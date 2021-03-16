interface Delivery {
    setNext(handler: Delivery): Delivery;

    handle(request: string): string;
}

abstract class AbstractDelivery implements Delivery
{
    private nextHandler: Delivery;

    public setNext(handler: Delivery): Delivery {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

class PickupHandler extends AbstractDelivery {
    public handle(request: string): string {
        if (request === 'Yes') {
            return `You will pick up the order yourself`;
        }
        return super.handle(request);

    }
}

class PointHandler extends AbstractDelivery {
    public handle(request: string): string {
        if (request === 'Yes') {
            return `We will deliver your order to pick-up point`;
        }
        return super.handle(request);
    }
}

class CourierHandler extends AbstractDelivery {
    public handle(request: string): string {
        if (request === 'Yes') {
            return `Courier will deliver order to your address`;
        }
        return super.handle(request);
    }
}

function clientCode(handler: Delivery) {
    const deliveryOptions = ['Yes', 'No'];

    for (const deliveryOption of deliveryOptions) {
        console.log(``);

        const result = handler.handle(deliveryOption);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`We cannot deliver your order`);
        }
    }
}

const pickup = new PickupHandler();
const point = new PointHandler();
const courier = new CourierHandler();

pickup.setNext(point).setNext(courier);

console.log('Chain: Pickup > Point > Courier');
clientCode(point);
console.log('Yes');