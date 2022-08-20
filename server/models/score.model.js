const score = (mongoose) => {
  var schema = mongoose.Schema(
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player",
      },
      boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "board",
      },
      score: Number,
      date: Date
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Score = mongoose.model("score", schema, "score");
  return Score;
};

export default score;