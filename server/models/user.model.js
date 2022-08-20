const user = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const User = mongoose.model("user", schema, "user");
  return User;
};

export default user;