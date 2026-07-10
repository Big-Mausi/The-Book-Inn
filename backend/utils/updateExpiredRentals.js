import Rental from "../models/rentalModel.js";

const updateExpiredRentals = async () => {
  const today = new Date();

  await Rental.updateMany(
    {
      status: "approved",
      dueDate: { $lt: today },
    },
    {
      $set: {
        status: "expired",
        adminMessage: "Rental period has expired",
      },
    }
  );
};

export default updateExpiredRentals;