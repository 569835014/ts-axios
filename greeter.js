var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
function greeter(person) {
    return 'Hello' + person.firstName + ' ' + person.lastName;
}
var user = new User('1', '2');
console.info(greeter(user));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
var color = Color.Green;
function error(message) {
    throw new Error(message);
}
var x = ['hello', 10];
x[3] = 'word';
