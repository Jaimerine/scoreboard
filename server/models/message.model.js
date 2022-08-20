const message = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      content: String,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Message = mongoose.model("message", schema, "message");
  return Message;
};

export default message;