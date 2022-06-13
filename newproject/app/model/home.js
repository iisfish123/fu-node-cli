'use strict'

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const HomeSchema = new Schema(
    {
      id: { type: String }, // id
    },
    {
      timestamps: { createdAt: 'createTime'} // 创建时间
    }
  );

  return mongoose.model('Home', HomeSchema)
};
