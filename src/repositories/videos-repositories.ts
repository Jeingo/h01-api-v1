const db = {
    videos: [
        {
            id: 0,
            title: "Lesson 1",
            author: "Jeingo",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2022-12-09T17:58:07.464Z",
            publicationDate: "2022-12-09T17:58:07.464Z",
            availableResolutions: ["P144"]
        }
    ]
}

export const videosRepositories = {
    getAllVideos() {
        return db.videos
    },
    createVideo(title: string, author: string, availableResolutions: Array<string>) {
        const tmpTime = new Date()
        const timeCreate = tmpTime.toISOString()
        const timePub = new Date(tmpTime.setDate((tmpTime.getDate() + 1))).toISOString()

        const createdVideo = {
            id: +(tmpTime),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: timeCreate,
            publicationDate: timePub,
            availableResolutions: availableResolutions
        }

        db.videos.push(createdVideo)
        return createdVideo
    },
    getVideoById(id: number) {
        const foundVideo = db.videos.find(v => v.id === id)
        return foundVideo
    },
    updateVideo(id: number) {
        const foundVideo = db.videos.find(v => v.id === id)
        return foundVideo
    },
    deleteVideo(id: number) {
        const foundVideo = db.videos.find(v => v.id === id)
        db.videos = db.videos.filter(v => v.id !== id)
        return foundVideo
    },
    clearAll() {
        db.videos = []
    }
}