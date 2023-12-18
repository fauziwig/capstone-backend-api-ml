const { Matrix } = require('ml-matrix');

// Dummy data untuk tujuan contoh
const data = [
    { userId: 'user1', location: 'placeA', rating: 5 },
    { userId: 'user1', location: 'placeB', rating: 4 },
    { userId: 'user2', location: 'placeA', rating: 3 },
    { userId: 'user2', location: 'placeB', rating: 5 },
    { userId: 'user1', location: 'placeA', rating: 5, latitude: 12.971598, longitude: 77.594562 },
    { userId: 'user1', location: 'placeB', rating: 4, latitude: 13.082680, longitude: 80.270721 },
    // ... tambahkan data sesuai kebutuhan
];

// Fungsi untuk membuat model collaborative filtering
function createCollaborativeFilteringModel(data) {
    const users = Array.from(new Set(data.map(entry => entry.userId)));
    const locations = Array.from(new Set(data.map(entry => entry.location)));
    const coordinates = {}; // Tambahan: simpan data koordinat lokasi

    const userMatrix = new Matrix(users.length, locations.length);

    data.forEach((entry) => {
        const userIndex = users.indexOf(entry.userId);
        const locationIndex = locations.indexOf(entry.location);
        userMatrix.set(userIndex, locationIndex, entry.rating);

        // Tambahan: simpan data koordinat lokasi
        coordinates[entry.location] = {
            latitude: entry.latitude, // Ganti dengan properti yang sesuai
            longitude: entry.longitude, // Ganti dengan properti yang sesuai
        };
    });

    return { users, locations, coordinates, userMatrix };
}

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


module.exports = {
    createCollaborativeFilteringModel,
};
