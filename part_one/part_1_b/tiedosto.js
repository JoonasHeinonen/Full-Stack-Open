const car1 = {
    brand: 'Toyota',
    model: 'Corolla',
    type: 'Sedan',
    year: 2007,
    gear: 'manual',
    motor: 2.0
}

const car2 = {
    brand: 'Ford',
    model: 'Focus',
    type: 'Estate Wagon',
    year: 2004,
    gear: 'manual',
    motor: 1.8
}

const car3 = {
    name: {
        brand: 'Ford',
        model: 'Focus',
    },
    type: 'Estate Wagon',
    year: 2004,
    gear: 'manual',
    motor: 1.8
}

console.log(car3.name);
const fieldname = 'type';
console.log(car1[fieldname]);

car2.brand = 'Nissan';
car2.model = 'Micra';
car2['radio'] = true;

console.log(car2.brand);
console.log(car2.model);
console.log(car2.radio);