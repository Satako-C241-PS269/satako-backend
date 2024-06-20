function getDiseaseInfo(classIndex) {
    const diseases = [
        {
            name: 'Leaf Blight',
            description: 'Leaf blight atau hawar daun adalah penyakit jamur yang mempengaruhi berbagai jenis tanaman, termasuk pohon dan tanaman pangan. Hawar daun ditandai dengan bercak atau garis mati pada daun, sering disertai dengan busuk biji dan hawar bibit, yang dapat menyebabkan kehilangan produksi tanaman yang signifikan karena penghambatan fotosintesis dan melemahnya atau matinya tanaman.',
            causes: 'Suhu, kelembaban tanaman, dan kerentanan tanaman',
            solutions: [
                '• Buang daun yang terinfeksi segera setelah muncul tanda-tanda; jika tidak, hal ini dapat membunuh tanaman',
                '• Perbaiki sirkulasi udara supaya daun bisa bergerak bebas dan bernapas',
                '• Tambahkan mulsa di sekitar pangkal tanaman untuk mengurangi percikan air',
                '• Hindari penyiraman dari atas, gunakan penyiram tanah',
                '• Kendalikan gulma - pangkas secara rutin pertumbuhan tanaman yang tidak diinginkan',
                '• Lakukan rotasi tanaman setiap tahun dan jangan tanam di tempat yang sama di mana hawar pernah terjadi',
            ]
        },
        {
            name: 'Leaf Rust',
            description: 'Leaf rust atau karat daun adalah penyakit jamur yang biasa menyerang dedaunan dan menyebabkan bercak kuning dan oranye, atau "karat," muncul di daun. Bercak ini sebenarnya adalah struktur reproduksi jamur yang pecah dan melepaskan spora. Penyakit ini bisa berdampak besar pada kesehatan tanaman dan hasil panen, sehingga penting untuk dipelajari dalam patologi tanaman, pertanian, atau mikrobiologi.',
            causes: 'Suhu, kelembaban, dan kerentanan tanaman',
            solutions: [
                '• Pilih varietas tanaman yang tidak mudah terkena penyakit',
                '• Batasi pergerakan masuk dan keluar dari perkebunan tanaman yang rentan',
                '• Penyiangan ladang - Kebanyakan tanaman pangan dipengaruhi oleh gulma. Beberapa gulma adalah inang alternatif untuk karat. Penyiangan menghilangkan persaingan untuk tanaman dan inang potensial.',
                '• Pemangkasan membantu meningkatkan sirkulasi udara, yang mencegah kelembaban menumpuk di daun'
            ]
        },
        {
            name: 'Leaf Spot',
            description: 'Leaf spot atau bercak daun adalah area kecil yang berubah warna dan terkena penyakit pada daun. Penyakit ini bisa disebabkan oleh infeksi jamur, bakteri, atau virus yang menyerang tanaman. Selain itu, bercak daun juga bisa muncul akibat kerusakan oleh nematoda, serangga, kondisi lingkungan, racun, atau herbisida.',
            causes: 'Patogen jamur, patogen bakteri, faktor lingkungan, patogen virus, nematoda',
            solutions: [
                '• Pastikan jarak tanam yang cukup antara tanaman, supaya ada sirkulasi udara yang baik. Ini membantu mencegah penyebaran penyakit',
                '• Hindari penyiraman dari atas yang membuat daun basah. Sebaiknya gunakan penyiram tanah atau sistem irigasi tetes',
                '• Jaga kebersihan kebun atau ladang dengan rutin membersihkan sisa-sisa tanaman yang mati atau terinfeksi',
                '• Jangan tanam jenis tanaman yang sama di tempat yang sama setiap tahun. Rotasi tanaman membantu mengurangi risiko infeksi ulang',
                '• Pilih varietas tanaman yang dikenal tahan terhadap bercak daun. Ini bisa mengurangi kemungkinan tanaman terinfeksi',
                '• Gunakan mikroba menguntungkan atau teh kompos untuk meningkatkan kesehatan tanaman dan melawan patogen',
                '• Jika perlu, gunakan fungisida atau bakterisida yang tepat untuk mengendalikan infeksi. Pastikan mengikuti petunjuk penggunaan yang aman',
                '• Rutin periksa tanaman untuk mendeteksi tanda-tanda awal infeksi. Tindakan cepat bisa mencegah penyebaran penyakit lebih lanjut'
            ]
        }
    ];
    return diseases[classIndex];
}

module.exports = getDiseaseInfo;
