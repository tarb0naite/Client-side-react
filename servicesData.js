
const servicesData = [
    {
      "id": 1,
      "type": "Engine",
      "icon": require('./icons/car-engine.png'), // Importing local icon
      "subServices": [
        {"id": 11, "name": "Oil Change"},
        {"id": 12, "name": "Spark Plug Replacement"},
        {"id": 13, "name": "Engine Tune-up"}
      ]
    },
    {
      "id": 2,
      "type": "Exterior",
      "icon": require('./icons/body-repair.png'), // Importing local icon
      "subServices": [
        {"id": 21, "name": "Car Wash"},
        {"id": 22, "name": "Paint Protection"},
        {"id": 23, "name": "Headlight Restoration"}
      ]
    },
    {
      "id": 3,
      "type": "Interior Services",
      "icon": require('./icons/car-seat.png'), // Importing local icon
      "subServices": [
        {"id": 31, "name": "Interior Detailing"},
        {"id": 32, "name": "Seat Upholstery Cleaning"},
        {"id": 33, "name": "Dashboard Polish"}
      ]
    },
    {
      "id": 4,
      "type": "Tire and Wheel Services",
      "icon": require('./icons/car.png'), // Importing local icon
      "subServices": [
        {"id": 41, "name": "Tire Rotation"},
        {"id": 42, "name": "Wheel Alignment"},
        {"id": 43, "name": "Tire Balancing"}
      ]
    },
    {
      "id": 5,
      "type": "Electrical Services",
      "icon": require('./icons/electric-car.png'), // Importing local icon
      "subServices": [
        {"id": 51, "name": "Battery Check and Replacement"},
        {"id": 52, "name": "Alternator Inspection"},
        {"id": 53, "name": "Wiring Repairs"}
      ]
    },
    {
      "id": 6,
      "type": "Brake Services",
      "icon": require('./icons/disc-brake.png'), // Importing local icon
      "subServices": [
        {"id": 61, "name": "Brake Pad Replacement"},
        {"id": 62, "name": "Brake Fluid Flush"},
        {"id": 63, "name": "Brake Caliper Inspection"}
      ]
    },
    {
      "id": 7,
      "type": "Transmission Services",
      "icon": require('./icons/transmision.png'), // Importing local icon
      "subServices": [
        {"id": 71, "name": "Transmission Fluid Change"},
        {"id": 72, "name": "Clutch Replacement"},
        {"id": 73, "name": "Transmission Inspection"}
      ]
    },
    {
      "id": 8,
      "type": "Suspension Services",
      "icon": require('./icons/damper.png'), // Importing local icon
      "subServices": [
        {"id": 81, "name": "Shock Absorber Replacement"},
        {"id": 82, "name": "Strut Inspection"},
        {"id": 83, "name": "Suspension System Alignment"}
      ]
    },
    {
      "id": 9,
      "type": "Fluid Services",
      "icon": require('./icons/fluid-mechanics.png'), // Importing local icon
      "subServices": [
        {"id": 91, "name": "Coolant Flush"},
        {"id": 92, "name": "Power Steering Fluid Change"},
        {"id": 93, "name": "Windshield Washer Fluid Top-Up"}
      ]
    },
    {
      "id": 10,
      "type": "Exhaust System Services",
      "icon": require('./icons/exhaust-pipe.png'), // Importing local icon
      "subServices": [
        {"id": 101, "name": "Exhaust Pipe Repair"},
        {"id": 102, "name": "Muffler Replacement"},
        {"id": 103, "name": "Catalytic Converter Inspection"}
      ]
    },
    {
      "id": 11,
      "type": "Air Conditioning Services",
      "icon": require('./icons/air-conditioning.png'), // Importing local icon
      "subServices": [
        {"id": 111, "name": "AC Recharge"},
        {"id": 112, "name": "HVAC System Cleaning"},
        {"id": 113, "name": "Compressor Inspection"}
      ]
    },
    {
      "id": 12,
      "type": "Safety Inspection Services",
      "icon": require('./icons/safety.png'), // Importing local icon
      "subServices": [
        {"id": 121, "name": "Lights and Signals Check"},
        {"id": 122, "name": "Wiper Blade Replacement"},
        {"id": 123, "name": "Horn Functionality Check"}
      ]
    }
  ];
  
  export default servicesData;
  