const Hapi = require('@hapi/hapi');
const { createCollaborativeFilteringModel } = require('./recommendationModel');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Dummy data untuk model collaborative filtering
    const data = [
        { userId: 'user1', location: 'placeA', rating: 5, latitude: 12.971598, longitude: 77.594562 },
        { userId: 'user1', location: 'placeB', rating: 4, latitude: 13.082680, longitude: 80.270721 },
        // ... tambahkan data sesuai kebutuhan
    ];

    const collaborativeFilteringModel = createCollaborativeFilteringModel(data);

    server.route({
        method: 'GET',
        path: '/nearest-locations',
        handler: async (request, h) => {
            const userId = request.query.userId;
            const userLatitude = parseFloat(request.query.userLatitude);
            const userLongitude = parseFloat(request.query.userLongitude);
    
            // Gunakan model collaborative filtering untuk mendapatkan rekomendasi
            const { users, locations, coordinates, userMatrix } = collaborativeFilteringModel;
            const userIndex = users.indexOf(userId);
    
            if (userIndex !== -1) {
                const userRatings = userMatrix.getRow(userIndex);
    
                // Hitung jarak dari lokasi pengguna ke lokasi lainnya
                const distances = locations.map((loc) => {
                    const locCoordinates = coordinates[loc];
                    const distance = haversine(userLatitude, userLongitude, locCoordinates.latitude, locCoordinates.longitude);
                    return { location: loc, distance };
                });
    
                // Urutkan lokasi berdasarkan jarak
                distances.sort((a, b) => a.distance - b.distance);
    
                // Ambil beberapa lokasi terdekat (contoh: 3 lokasi terdekat)
                const nearestLocations = distances.slice(0, 3);
    
                // Kembalikan lokasi terdekat sebagai respons
                return { nearestLocations };
            } else {
                return { error: 'User not found' };
            }
        },
    });
    server.route({
        method: 'GET',
        path: '/user1-locations',
        handler: async (request, h) => {
            const userId = 'user1';  // Ganti dengan nilai yang sesuai
            const userIndex = collaborativeFilteringModel.users.indexOf(userId);
    
            if (userIndex !== -1) {
                const userRatings = collaborativeFilteringModel.userMatrix.getRow(userIndex);
                const userLocations = collaborativeFilteringModel.locations.filter((loc, index) => userRatings[index] > 0);
    
                return { userLocations };
            } else {
                return { error: 'User not found' };
            }
        },
    });
    
    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// Fungsi Haversine untuk menghitung jarak
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
