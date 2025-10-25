import couchbase from 'couchbase'
import dotenv from "dotenv"
dotenv.config()

const DB_USERNAME = process.env.CB_USERNAME
const DB_PASSWORD = process.env.CB_PASSWORD
const DB_CONN_STR = process.env.CB_URI
const DB_BUCKET_NAME = process.env.CB_BUCKET

if (!DB_USERNAME) {
  throw new Error(
    'Please define the DB_USERNAME environment variable inside dev.env',
  )
}

if (!DB_PASSWORD) {
  throw new Error(
    'Please define the DB_PASSWORD environment variable inside dev.env',
  )
}

if (!DB_CONN_STR) {
  throw new Error(
    'Please define the DB_CONN_STR environment variable inside dev.env',
  )
}

if (!DB_BUCKET_NAME) {
  throw new Error(
    'Please define the DB_BUCKET_NAME environment variable inside dev.env',
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.couchbase

if (!cached) {
  cached = global.couchbase = { conn: null }
}

async function createCouchbaseCluster() {
  if (cached.conn) {
    return cached.conn
  }

  // Use wan profile to avoid latency issues
  cached.conn = await couchbase.connect(DB_CONN_STR, {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    configProfile: 'wanDevelopment',
  })

  return cached.conn
}

export async function connectToDatabase() {
  const cluster = await createCouchbaseCluster()
  const bucket = cluster.bucket(DB_BUCKET_NAME)
  const scope = bucket.scope('_default')
  const roomsCollection = bucket.scope('_default').collection('rooms')

  let dbConnection = {
    cluster,
    bucket,
    scope,
    roomsCollection,
  }

  return dbConnection
}