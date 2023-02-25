const player = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      boardId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "board",
        },

    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("player", schema, "player");
};

export default player;