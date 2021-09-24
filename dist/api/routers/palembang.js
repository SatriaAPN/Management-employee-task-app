const router = require('express')();
const { palembangController } = require('../controllers');

router.get('/hotel', palembangController.getHotel);

router.get('/kuliner', palembangController.getKuliner);

router.get('/wisata', palembangController.getWisata);

router.get('/tempatibadah', palembangController.getTempatIbadah);

module.exports = router;