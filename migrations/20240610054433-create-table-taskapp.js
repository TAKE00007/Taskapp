'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  // usersテーブルを作成
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    email: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    created_at: 'datetime',
    updated_at: 'datetime'
  }, createTasksTable);
  // createtable関数は非同期関数なので、コールバック関数を引数に取り、順序を保証
  function createTasksTable(err) {
    if (err) return callback(err);
    // tasksテーブルを作成
    db.createTable('tasks', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'tasks_user_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          // onDelete: 'CASCADE'で親テーブルのレコードが削除されたとき、子テーブルのレコードも削除
          // onUpdate: 'RESTRICT'で親テーブルのレコードが更新されたとき、子テーブルのレコードも更新
          mapping: 'id'
          // mapping: 'id'でusersテーブルのidカラムとtasksテーブルのuser_idカラムを紐付け
        }
      },
      title: { type: 'string', notNull: true },
      description: 'text',
      status: 'string',
      deadline: 'datetime',
      created_at: 'datetime',
      updated_at: 'datetime'
    }, callback);
  }
};

exports.down = function(db, callback) {
  db.dropTable('tasks', function(err) {
    if (err) return callback(err);
    db.dropTable('users', callback);
  });
};
// down関数では、tasksテーブルを先に削除してからusersテーブルを削除

exports._meta = {
  "version": 1
};
