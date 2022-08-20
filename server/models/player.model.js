const player = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Player = mongoose.model("player", schema, "player");
  return Player;
};

export default player;