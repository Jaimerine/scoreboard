const board = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: { type: String, required: true, minLength: 1 },
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
      settings: {
        minScore: Number,
        maxScore: Number
      }
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("board", schema, "board");
};

export default board;