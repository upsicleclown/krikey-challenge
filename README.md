# Krikey AI Code Challenge

### Part 1: SQL Challenge

The queries are found under [`database/queries`](./database/queries).

### Part 2B: API Performance
In order to optimize the endpoint, I filtered the results before the `JOIN` if only one author was required. I also added indexes to the SQL query on the foreign keys in `books` and `sale_items` to [`database/schema.sql`](./database/schema.sql)). I also added a simple in-memory cache (with no timeout since the data is currently static).

### Part 3: Build & Deploy Webpage
This was done by:
1. Creating a PostgreSQL database instance hosted by ElephantSQL.
2. Packaging the service into a Docker image
3. Pushing the Docker image to DockerHub ([here](https://hub.docker.com/r/upsicleclown/krikey-challenge-service))
4. Uploading this image on Railway, the API is available [here](https://wiry-chicken-production.up.railway.app/author)
5. Deploying the client application on Vercel [here](https://krikey-challenge.vercel.app/)

**Note:** The service was deployed on April 6th, 2024 on the free tier of Railway and will only run until the credits for my free usage tier run out. If this API is not resposive, this is likely the cause. You can always follow the steps below to run locally.

To run locally:
1.  `git clone` the repo into some directory I will henceforth refer to as `$DIR`.
2. In `$DIR/service`, run `npm start`
3. In `$DIR/client`, run `npm start`
4. Enjoy!

