from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import os
from dotenv import load_dotenv

def get_collection(dbName, collectionName):
    # Load environment variables from the .env file
    load_dotenv()

    # Access the environment variables in your script
    mongodb_uri = os.getenv('MONGODB_URI')
    mongodb_user = os.getenv('MONGODB_USER')
    mongodb_password = os.getenv('MONGODB_PASSWORD')

    # uri = f'mongodb://{mongodb_user}:{mongodb_password}@{mongodb_uri}/?retryWrites=true&w=majority'
    uri = f'mongodb+srv://{mongodb_user}:{mongodb_password}@{mongodb_uri}/?retryWrites=true&w=majority'
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        db = client[dbName]
        collection = db[collectionName]
        return collection
    except Exception as e:
        print(e)
    