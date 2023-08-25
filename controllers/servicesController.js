const asyncHandler = require('express-async-handler')

const {User} = require('../models/User')
const {Service} = require('../models/Service')
const {Category} = require('../models/Category')

/**
 * @desc Get all Services
 * @route Get /services
 * @access Public
 */
const getAllServices = asyncHandler(async (req, res) => {
    // get all the services
    let services

    if(req.query.categories) {
        services = await Service.find({ category: req.query.categories }).populate('user category', '-password')
    } else {
        services = await Service.find().populate('user category', '-password')
    }

    if(!services?.length) {
        return res.status(400).json({ message: 'No Services found'})
    }

    res.json(services)
})

/**
 * @desc Get 12 featured services
 * @route GET /services/featured
 * @access Public
 */
const getFeatured = asyncHandler(async (req, res) => {
    const featured = await Service.find({ isFeatured: true })
    
    if(!featured?.length) {
        return res.status(400).json({ message: 'No Services featured found'})
    }

    res.json(featured)
})

/**
 * @desc Get Singel Services
 * @route Get /services
 * @access Public
 */
const getService = asyncHandler(async (req, res) => {
    // get single service

    const { id } = req.params

    const service = await Service.findById(id).populate('user category', '-password')
    // const service = await Service.findById(id)
    if(!service) {
        return res.status(400).json({ message: 'No Service found'})
    }

    res.json(service)
})

/**
 * @desc Create a new Service
 * @route Post /services
 * @access Private
 */
const createNewService = asyncHandler(async (req, res) => {
    // Create a new Service
    const { user, category, title, details, price, description } = req.body

    if ( !title || !category ) {
        return res.status(400).json({ message: 'All fields(title, and category) are required'})
    }
    
    // // checking user exists
    // const serviceUser = await User.findById(user).exec()
    // if (!serviceUser) {
    //     return res.status(400).json({ message: 'The user is invalid' })
    // }

    const file = req.file;
    let imagePath;

    let fileName = 'piblic/images/service.png';
    let basePath = process.env.BASE_PATH;
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = `${basePath}${fileName}`;
    }
    // Create and store service
    const serviceObject = { user, category, title, details, description, price, image: imagePath }
    const service = await Service.create(serviceObject)

    if (service) {
        res.status(201).json({ message: `New service ${service.title} created`})
    } else {
        res.status(400).json({ message: 'Invalid service data recieved' })
    }

})

/**
 * @desc Update a Service
 * @route PATCH /services
 * @access Private
 */
const updateService = asyncHandler(async (req, res) => {
    // Update a Service
    const { id, category, title, details, description, price, active } = req.body

    if ( !id ) {
        return res.status(400).json({ message: 'id i required to update'})
    }

    // Confirm service exists to update
    const service = await Service.findById(id).exec()
    if (!service) {
        return res.status(400).json({ message: 'Service not found'})
    }

    // Check for service with the same title
    const duplicate = await Service.findOne({ title })
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    const file = req.file;
    let imagePath;

    let basePath = process.env.BASE_PATH;
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
        service.image = imagePath
    }

    service.title = title
    service.details = details
    service.description = description
    service.price = price
    service.category = category
    service.active = active

    const updatedService = await service.save()

    res.json({ message: `${updatedService.title} updated`})
})

/**
 * @desc Delete a new service
 * @route Delete /services
 * @access Private
 */
const deleteService = asyncHandler(async (req, res) => {
    // Delete Service
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm service exists to delete
    const service = await Service.findById(id).exec()
    if (!service) {
        return res.status(400).json({ message: 'Service not found' })
    }

    const result = await service.deleteOne()

    const reply = `Service ${result.title} with ID ${result._id} deleted`
    res.json({message: reply})
})

module.exports = {
    getAllServices,
    getService,
    getFeatured,
    createNewService,
    updateService,
    deleteService
}
