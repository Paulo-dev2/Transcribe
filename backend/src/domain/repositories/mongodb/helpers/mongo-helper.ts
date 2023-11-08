import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  async connect (uri: string): Promise<void> {
    this.client = (await MongoClient.connect(uri))
  },
  async disconnect (): Promise<void> {
    if (this.client) {
      this.client.close()
    }
  },
  getCollection (name: string): Collection {
    if (this.client) {
      return this.client.db('teste').collection(name)
    }
    throw new Error('MongoClient is not connected')
  },
  async clearCollection (name: string): Promise<void> {
    if (this.client) {
      await this.client.db('teste').collection(name).deleteMany({})
    } else {
      throw new Error('MongoClient is not connected')
    }
  }
}

