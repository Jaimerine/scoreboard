const board = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      players: [
        {
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "player",
          },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Board = mongoose.model("board", schema, "board");
  return Board;
};

export default board;