// inherit function
Function.prototype.inherits = function (Parent) {
    "use strict";

    this.prototype = new Parent();
    this.prototype.constructor = Parent;
};

// universal function for defining properties
Object.prototype.defineProperty = function (propertyName, propertyBody) {
    "use strict";

    Object.defineProperty(this, propertyName, propertyBody);
};

// a namespace with custom exception classes
var errorsNS = (function myfunction() {
    "use strict";

    function NotOverriddenFunctionError(message) {
        this.message = message;
    }
    NotOverriddenFunctionError.inherits(Error);

    function PropellingNozzleError(message) {
        this.message = message;
    }
    PropellingNozzleError.inherits(Error);

    function WheelError(message) {
        this.message = message;
    }
    WheelError.inherits(Error);

    function PropellerError(message) {
        this.messsage = message;
    }
    PropellerError.inherits(Error);

    function VehicleError(message) {
        this.message = message;
    }
    VehicleError.inherits(Error);

    function LandVehicleError(message) {
        this.message = message;
    }
    LandVehicleError.inherits(Error);

    function WaterVehicleError(message) {
        this.message = message;
    }
    WaterVehicleError.inherits(Error);

    function AirVehicleError(message) {
        this.message = message;
    }
    AirVehicleError.inherits(Error);

    function AmphibiousVehicleError(message) {
        this.message = message;
    }
    AmphibiousVehicleError.inherits(Error);

    return {
        NotOverriddenFunctionError: NotOverriddenFunctionError,
        PropellingNozzleError: PropellingNozzleError,
        WheelError: WheelError,
        PropellerError: PropellerError,
        VehicleError: VehicleError,
        LandVehicleError: LandVehicleError,
        WaterVehicleError: WaterVehicleError,
        AirVehicleError: AirVehicleError,
        AmphibiousVechicleError: AmphibiousVehicleError
    };
}());

var enumsNS = (function () {
    "use strict";

    // enum, Object.freeze doesn't allow changes on values.
    var afterBurnerEnum = Object.freeze({
        ON: true,
        OFF: false
    }),

        spinDirectionEnum = Object.freeze({
            Clockwise: 0,
            CounterClockwise: 1
        }),

        amphibiousModeEnum = Object.freeze({
            waterMode: 0,
            landMode: 1
        });

    return {
        afterBurnerEnum: afterBurnerEnum,
        spinDirectionEnum: spinDirectionEnum,
        amphibiousModeEnum: amphibiousModeEnum
    };
}());

// a namespace with propulsion unit classes
var propulsionUnitsNS = (function () {
    "use strict";

    // abstract class
    function PropulsionUnit() {
        // fake class just to have some inheritance
    }

    PropulsionUnit.prototype.getAcceeleration = function () {
        throw new errorsNS.NotOverriddenFunctionError("The function should be overridden!" +
            "The parent class does not know how the children classes are calculating their acceleration");
    };

    function Wheel(wheelRadius) {
        if (wheelRadius && wheelRadius <= 0) {
            throw new errorsNS.WheelError("The radius of the wheel can not be zero or less than zero");
        }
        var radius = wheelRadius;

        this.defineProperty("radius", {
            get: function () {
                return radius;
            }
        });
    }

    Wheel.inherits(PropulsionUnit);

    Wheel.prototype.getPerimeter = function () {
        return parseInt(this.radius * 2 * Math.PI, 10);
    };

    Wheel.prototype.produceAccelerate = function () {
        return this.getPerimeter();
    };

    function PropellingNozzle(maxPower) {
        if (maxPower <= 0) {
            throw new errorsNS.PropellingNozzleError("Maximal power can not be zero or less than zero.");
        }

        var afterBurnerSwitch = enumsNS.afterBurnerEnum.OFF; // off by default

        this.defineProperty("maxPower", {
            get: function () {
                return maxPower;
            }
        });

        this.defineProperty("afterBurnerSwitch", {
            get: function () {
                return afterBurnerSwitch;
            },
            set: function (mode) {
                afterBurnerSwitch = mode;
            }
        });
    }

    PropellingNozzle.inherits(PropulsionUnit);

    PropellingNozzle.prototype.produceAccelerate = function () {
        if (this.afterBurnerSwitch === enumsNS.afterBurnerEnum.ON) {
            return this.maxPower * 2;
        }

        return this.maxPower;
    };

    // private function for checking the enum type inputs
    function isEnumType(enumeration, value) {
        var property;

        for (property in enumeration) {
            if (enumeration[property] === value) {
                return true;
            }
        }

        return false;
    }

    function Propeller(finCount) {
        if (finCount < 2) {
            throw new errorsNS.PropellerError("The fins of the propeller should be atleast two.");
        }

        var finsCount = finCount,
            spinDirection = enumsNS.spinDirectionEnum.Clockwise; // moving forward by default

        this.defineProperty("finsCount", {
            get: function () {
                return finsCount;
            }
        });

        this.defineProperty("spinDirection", {
            get: function () {
                return spinDirection;
            },
            set: function (direction) {
                if (isEnumType(enumsNS.spinDirectionEnum, direction)) {
                    spinDirection = direction;
                } else {
                    throw new TypeError("Spin direction can be only enum type clockwise or counter clockwise.");
                }
            }
        });
    }

    Propeller.inherits(PropulsionUnit);

    Propeller.prototype.produceAccelerate = function () {
        if (this.spinDirection === enumsNS.spinDirectionEnum.Clockwise) {
            return this.finsCount;
        }

        return -(this.finsCount);
    };

    return {
        Wheel: Wheel,
        PropellingNozzle: PropellingNozzle,
        Propeller: Propeller,
        isEnumType: isEnumType
    };
}());

// a namespace with vehicle classes
var vehiclesNS = (function () {
    "use strict";

    // abstract class
    function Vehicle(propolsionUnits) {
        this.defineProperty("propulsionUnits", {
            get: function () {
                return propolsionUnits || [];
            }
        });

        this.defineProperty("speed", {
            get: function () {
                return this.accelerate();
            }
        });
    }

    Vehicle.prototype.accelerate = function () {
        var acceleration = 0;
        this.propulsionUnits.forEach(function (element) {
            acceleration += element.produceAccelerate();
        });

        return acceleration;
    };

    function LandVehicle(wheels) {
        if (!(wheels instanceof Array)) {
            throw new TypeError("The given argument should be of type Array.");
        }

        wheels.forEach(function (element) {
            if (!(element instanceof propulsionUnitsNS.Wheel)) {
                throw new TypeError("Each element in the list should be of type Wheel");
            }
        });

        if (wheels.length !== 4) {
            throw new errorsNS.VehicleError("The land vehicle should have four wheels.");
        }

        Vehicle.call(this, wheels);
    }
    LandVehicle.inherits(Vehicle);

    function AirVehicle(PropellingNozzlePower) {
        var self = this;
        Vehicle.call(self, [new propulsionUnitsNS.PropellingNozzle(PropellingNozzlePower)]);

        self.defineProperty("afterBurnerMode", {
            get: function () {
                return self.propulsionUnits[0].afterBurnerSwitch;
            }
        });
    }
    AirVehicle.inherits(Vehicle);

    AirVehicle.prototype.setAfterBurnerMode = function (state) {
        if (propulsionUnitsNS.isEnumType(enumsNS.afterBurnerEnum, state)) {
            if (state) {
                this.propulsionUnits[0].afterBurnerSwitch = enumsNS.afterBurnerEnum.ON;
            } else {
                this.propulsionUnits[0].afterBurnerSwitch = enumsNS.afterBurnerEnum.OFF;
            }
        }
    };

    function WaterVehicle(propellers) {
        if (!(propellers instanceof Array)) {
            throw new TypeError("Propellers should be in an array!");
        }

        var self = this;
        Vehicle.call(self, propellers);
    }
    WaterVehicle.inherits(Vehicle);

    WaterVehicle.prototype.setDirection = function (direction) {
        if (propulsionUnitsNS.isEnumType(enumsNS.spinDirectionEnum, direction)) {
            if (direction) {
                this.propulsionUnits[0].spinDirection = enumsNS.spinDirectionEnum.CounterClockwise;
            } else {
                this.propulsionUnits[0].spinDirection = enumsNS.spinDirectionEnum.Clockwise;
            }
        }
    };

    function AmphibiousVehicle(wheels, propellers) {
        if (!(propellers instanceof Array)) {
            throw new TypeError("Propellers should be in an array!");
        }

        if (!(wheels instanceof Array)) {
            throw new TypeError("Wheels should be in an array!");
        }

        var self = this,
            amphibiousMode = enumsNS.amphibiousModeEnum.landMode;

        Vehicle.call(self, wheels.concat(propellers));

        self.defineProperty("vehicleMode", {
            get: function () {
                return amphibiousMode;
            },
            set: function (value) {
                amphibiousMode = value;
            }
        });
    }

    AmphibiousVehicle.inherits(Vehicle);

    AmphibiousVehicle.prototype.setMode = function (mode) {
        this.vehicleMode = mode;
    };

    AmphibiousVehicle.prototype.accelerate = function () {
        var acceleration = 0;
        if (this.vehicleMode === enumsNS.amphibiousModeEnum.landMode) {
            this.propulsionUnits.forEach(function (element) {
                if (element instanceof propulsionUnitsNS.Wheel) {
                    acceleration += element.produceAccelerate();
                }
            });
        } else {
            this.propulsionUnits.forEach(function (element) {
                if (element instanceof propulsionUnitsNS.Propeller) {
                    acceleration += element.produceAccelerate();
                }
            });
        }

        return acceleration;
    };

    return {
        Vehicle: Vehicle,
        LandVehicle: LandVehicle,
        AirVehicle: AirVehicle,
        WaterVehicle: WaterVehicle,
        AmphibiousVehicle: AmphibiousVehicle
    };
}());