import request from 'supertest'
import {app, HTTP_STATUSES} from "../../src"
import {videosRepositories} from "../../src/repositories/videos-repositories"

describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('GET /videos - should return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200,[])
    })

    let createdVideo: any = null
    it('POST /videos - should return 201 and created object h01.Video', async () => {
        const data = {
            title: 'Test',
            author: 'Unknown',
            availableResolutions: ['P144']
        }
        const createResponse = await request(app)
            .post('/videos')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)
        createdVideo = createResponse.body
        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: "Test",
            author: "Unknown",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ['P144']
        })
    })
    it('GET /videos - should return 200 and array objects h01.Video', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, videosRepositories.getAllVideos())
    })
    it('GET /videos/:id - should return 404', async () => {
        await request(app)
            .get('/videos/0')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('POST /videos/ - should not create object h01.Video with incorrect input data', async () => {
        const data = {
            title: 'TestTestTestTestTestTestTestTestTestTest_43',
            author: 'TestTestTestTestTest_23',
            availableResolutions: ['P']
        }
        await request(app)
            .post('/videos/')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

})
