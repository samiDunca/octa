const catchAsync = require('./../utils/catchAsync');

const Project = require('./../models/projectModel');
const Order = require('./../models/orderModel');
const Montage = require('./../models/montageModel');

const orderStatusHandler = (data) => {
  const updatedData = data.map((order) => {
    if (!order.montage.mounted && !order.door.delivered) {
      return {
        ...order,
        order: {
          ...order.order,
          status: 'undone',
        },
      };
    } else if (order.door.delivered && !order.montage.mounted) {
      return {
        ...order,
        order: {
          ...order.order,
          status: 'partially',
        },
      };
    } else {
      return {
        ...order,
        order: {
          ...order.order,
          status: 'done',
        },
      };
    }
  });

  return updatedData;
};

module.exports = { orderStatusHandler };
