// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
import { BuildOptions, Model, Sequelize } from 'sequelize';
import { Contact_Us, Contact_UsModelAttributes } from './contact_us';
import { SubscribeUser, SubscribeUserModelAttributes } from './subscribeuser'
import { User, UserModelAttributes } from "./user";
import { UserAddress, UserAddressModelAttributes } from "./useraddress"
import { ServiceRequest, ServiceRequestModelAttributes } from "./servicerequest"
import { ServiceRequestAddress, ServiceRequestAddressModelAttributes } from "./servicerequestaddress"
import { ServiceRequestExtra, ServiceRequestExtraModelAttributes } from "./servicerequestextra"
import { FavoriteAndBlocked, FavoriteAndBlockedModelAttributes } from "./favoriteandblocked"

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type Contact_UsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Contact_Us;
};

const Contact_UsDefineModel = sequelize.define(
  'Contact_Us',
  {
    ...Contact_UsModelAttributes
  },
  {
    tableName: 'Contact_Us'
  }
) as Contact_UsModelStatic;

type SubscribeUserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SubscribeUser;
};

const SubscribeUserDefineModel = sequelize.define(
  'SubscribeUser',
  {
    ...SubscribeUserModelAttributes
  },
  {
    tableName: 'SubscribeUser'
  }
) as SubscribeUserModelStatic;

type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
  };

  const UserDefineModel = sequelize.define(
    'User',
    {
      ...UserModelAttributes
    },
    {
      tableName: 'User'
    }
  ) as UserModelStatic;

  type UserAddressModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserAddress;
  };

  const UserAddressDefineModel = sequelize.define(
    'UserAddress',
    {
      ...UserAddressModelAttributes
    },
    {
      tableName: 'UserAddress'
    }
  ) as UserAddressModelStatic;

  type ServiceRequestModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ServiceRequest;
  };
  
  const ServiceRequestDefineModel = sequelize.define(
    'ServiceRequest',
    {
      ...ServiceRequestModelAttributes
    },
    {
      tableName: 'ServiceRequest'
    }
  ) as ServiceRequestModelStatic;

  type ServiceRequestAddressModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ServiceRequestAddress;
  };

  const ServiceRequestAddressDefineModel = sequelize.define(
    'ServiceRequestAddress',
    {
      ...ServiceRequestAddressModelAttributes
    },
    {
      tableName: 'ServiceRequestAddress'
    }
  ) as ServiceRequestAddressModelStatic;

  type ServiceRequestExtraModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ServiceRequestExtra;
  };

  const ServiceRequestExtraDefineModel = sequelize.define(
    'ServiceRequestExtra',
    {
      ...ServiceRequestExtraModelAttributes
    },
    {
      tableName: 'ServiceRequestExtra'
    }
  ) as ServiceRequestExtraModelStatic;

  type FavoriteAndBlockedModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): FavoriteAndBlocked;
  };

  const FavoriteAndBlockedDefineModel = sequelize.define(
    'FavoriteAndBlocked',
    {
      ...FavoriteAndBlockedModelAttributes
    },
    {
      tableName: 'FavoriteAndBlocked'
    }
  ) as FavoriteAndBlockedModelStatic;

  export interface DbContext {
    sequelize: Sequelize;
    Contact_Us: Contact_UsModelStatic;
    SubscribeUser: SubscribeUserModelStatic;
    User: UserModelStatic;
    UserAddress: UserAddressModelStatic;
    ServiceRequest: ServiceRequestModelStatic;
    ServiceRequestAddress: ServiceRequestAddressModelStatic;
    ServiceRequestExtra: ServiceRequestExtraModelStatic;
    FavoriteAndBlocked: FavoriteAndBlockedModelStatic;
  }

  export const db: DbContext = {
    sequelize: sequelize,
    Contact_Us: Contact_UsDefineModel,
    SubscribeUser: SubscribeUserDefineModel,
    User: UserDefineModel,
    UserAddress: UserAddressDefineModel,
    ServiceRequest: ServiceRequestDefineModel,
    ServiceRequestAddress: ServiceRequestAddressDefineModel,
    ServiceRequestExtra: ServiceRequestExtraDefineModel,
    FavoriteAndBlocked: FavoriteAndBlockedDefineModel
  };

  db.User.hasMany(db.UserAddress, {
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
  });
  db.UserAddress.belongsTo(db.User, {
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
  });
  db.ServiceRequest.hasOne(db.ServiceRequestAddress, {
    foreignKey: {
      name: "ServiceRequestId",
      allowNull: false,
    },
    as:'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE",
  });
  db.ServiceRequestAddress.belongsTo(db.ServiceRequest, {
    foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.ServiceRequest.belongsTo(db.User,{
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as:'UserServiceRequest',
  constraints: true,
  onDelete: "CASCADE",
});
db.User.hasMany(db.ServiceRequest,{
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as:'UserServiceRequest',
  constraints: true,
  onDelete: "CASCADE",
});
db.ServiceRequest.belongsTo(db.User,{
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: false,
  },
  as:'ProviderRequest',
  constraints: true,
  onDelete: "CASCADE",
});
db.User.hasMany(db.ServiceRequest,{
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: false,
  },
  as:'ProviderRequest',
  constraints: true,
  onDelete: "CASCADE",
});
db.ServiceRequest.hasMany(db.ServiceRequestExtra,{
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: true,
  },
  as:'ExtraService',
  constraints: true,
  onDelete: "CASCADE",
});
db.User.hasMany(db.FavoriteAndBlocked,{
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as:'FavoriteAndBlocked',
  constraints: true,
  onDelete: "CASCADE",
});
  // export {UserDefineModel};
  // export {UserAddressDefineModel};
  // export {ServiceRequestDefineModel};
  // export {ServiceRequestAddressDefineModel};
  // export {ServiceRequestExtraDefineModel};
  // export {FavoriteAndBlockedDefineModel};
  export default db;