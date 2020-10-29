module.exports= function(connection, DataTypes) {
    var Post = connection.define("Post", {
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
          },  
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          len: [1]
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            len: [1]
        }
      });
    return Post;        
}; 