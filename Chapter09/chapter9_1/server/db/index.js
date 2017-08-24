const uuidV4 = require('uuid/v4')
const low = require('lowdb')
const db = low('db.json')

// create a default database if it does not exist yet
const defaultDb = require('./defaultDb.json')
db.defaults(defaultDb).write()

// post related functions
const getPosts = () => db.get('posts').value()
const getPost = (id) => db.get('posts').find({ id }).value()
const deletePost = (id) => db.get('posts').remove({ id }).write()
const createPost = (post) => db.get('posts').push(
  Object.assign(post, {
    id: uuidV4(), // add `id` to post
    created: Date.now(), // set `created`...
    updated: Date.now()  // ...and `updated` values
  })
).write().slice(-1).pop() // `slice` ensures we do not modify the in-memory db
const updatePost = (id, updatedPost) =>
  db.get('posts').find({ id }).assign(
    Object.assign(updatedPost, {
      updated: Date.now() // update `updated` value
    })
  ).write()

// user related functions
const getUsers = () => db.get('users').value()
const getUser = (username) => db.get('users').find({ username }).value()
const deleteUser = (username) => db.get('users').remove({ username }).write()
const createUser = (user) => db.get('users').push(user).write().slice(-1).pop()
const updateUser = (username, updatedUser) =>
  db.get('users').find({ username }).assign(updatedUser).write()

// export database functions
module.exports = {
  getPosts, getPost, deletePost, createPost, updatePost, // post related
  getUsers, getUser, deleteUser, createUser, updateUser  // user related
}
