import { Client, Databases, Query, Storage, ID } from "appwrite";
import { conf } from '../conf/config';

class DbService {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectID);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ slug, title, content, status, featuredImage, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, status, featuredImage }) {
        try {
            return this.databases.updateDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            this.databases.deleteDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return this.databases.getDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug
            );

        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async showPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                [
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: showPosts :: error", error);

            return false;
        }
    }

    // file upload service (Storage service)
    async uploadFile(file) {
        try {
            return this.storage.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;

        }
    }

    async deleteFile(fileID) {
        try {
            this.storage.deleteFile(
                conf.appWriteBucketID,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;

        }
    }

   async filePreview(fileID) {
        return this.storage.getFilePreview(
            conf.appWriteBucketID,
            fileID
        );
    }
}

const dbService = new DbService();

export default dbService;