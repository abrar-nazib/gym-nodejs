const router = require("express").Router();

// Import Controllers
const {
  bodyPartList,
  bodyPartByName,
  exerciseById,
  exerciseByName,
  targetList,
  exerciseByTarget,
  exerciseByEquipment,
  listExercises,
  equipmentList,
} = require("../controllers/apiController");

/**
 * @swagger
 * /api/exercises/bodyPartList:
 *   get:
 *     summary: Get a list of body parts for exercises
 *     description: Returns an array of strings representing the different body parts that can be targeted with exercises.
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of body part strings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Chest"
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Body Parts
 */
router.get("/exercises/bodyPartList", bodyPartList);

/**
 * @swagger
 * /api/exercises/bodyPart/{bodyPart}:
 *   get:
 *     summary: Get exercises by body part
 *     parameters:
 *       - in: path
 *         name: bodyPart
 *         description: The body part to search for exercises
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of exercises that target the specified body part
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Invalid body part name provided
 *       404:
 *         description: No exercises found that target the specified body part
 *     tags:
 *       - Body Parts
 */
router.get("/exercises/bodyPart/:bodyPart", bodyPartByName);

/**
 * @swagger
 * /api/exercises/exercise/{id}:
 *   get:
 *     summary: Search for an exercise by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exercise to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The exercise object that matches the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Bad request, id parameter is not specified or is not valid
 *       404:
 *         description: No exercise found that matches the provided ID
 */
router.get("/exercises/exercise/:id", exerciseById); // search by id

/**
 * @swagger
 * /api/exercises/name/{query}:
 *   get:
 *     summary: Search for exercises by name
 *     parameters:
 *       - in: path
 *         name: query
 *         description: The search query to use to find exercises by name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of exercises matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Invalid search query provided
 *       404:
 *         description: No exercises found matching the search query
 */
router.get("/exercises/name/:query", exerciseByName); // search by name

/**
 * @swagger
 * /api/exercises/targetList:
 *   get:
 *     summary: Get a list of target muscles
 *     responses:
 *       200:
 *         description: A list of target muscles used in the exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ['Biceps', 'Triceps', 'Chest']
 *       404:
 *         description: No target muscles found
 *     tags:
 *       - Target
 */
router.get("/exercises/targetList", targetList); // list of target muscles

/**
 * @swagger
 * /api/exercises/target/{target}:
 *   get:
 *     summary: Get exercises that target a specific muscle
 *     parameters:
 *       - in: path
 *         name: target
 *         schema:
 *           type: string
 *         required: true
 *         description: The muscle to search for
 *     responses:
 *       200:
 *         description: A list of exercises that target the specified muscle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *               example:
 *                 - id: '1'
 *                   name: 'Bench Press'
 *                   target: 'Chest'
 *                   bodyPart: 'Upper Body'
 *                   equipment: 'Barbell'
 *                   gifUrl: 'https://media.giphy.com/media/YPg0vYZiRS6SY/giphy.gif'
 *                 - id: '2'
 *                   name: 'Push-up'
 *                   target: 'Chest'
 *                   bodyPart: 'Upper Body'
 *                   equipment: 'None'
 *                   gifUrl: 'https://media.giphy.com/media/l0MYNtkGofP9Hi2bS/giphy.gif'
 *       404:
 *         description: No exercises found that target the specified muscle
 *     tags:
 *       - Target
 */
router.get("/exercises/target/:target", exerciseByTarget); // returns exercises that target the specified muscle in an array

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get a list of exercises
 *     responses:
 *       200:
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *               example:
 *                 - id: '1'
 *                   name: 'Bench Press'
 *                   target: 'Chest'
 *                   bodyPart: 'Upper Body'
 *                   equipment: 'Barbell'
 *                   gifUrl: 'https://media.giphy.com/media/YPg0vYZiRS6SY/giphy.gif'
 *                 - id: '2'
 *                   name: 'Squat'
 *                   target: 'Quadriceps'
 *                   bodyPart: 'Lower Body'
 *                   equipment: 'Barbell'
 *                   gifUrl: 'https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif'
 *       404:
 *         description: No exercises found
 *     tags:
 *       - Exercises
 */
router.get("/exercises", listExercises);

/**
 * @swagger
 *
 * /api/exercises/equipment/{equipment}:
 *   get:
 *     summary: Get exercises by equipment
 *     description: Returns exercises that require the specified equipment in an array.
 *     parameters:
 *       - in: path
 *         name: equipment
 *         description: The name of the equipment to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the exercise.
 *                   name:
 *                     type: string
 *                     description: The name of the exercise.
 *                   bodyPart:
 *                     type: string
 *                     description: The body part that the exercise targets.
 *                   equipment:
 *                     type: string
 *                     description: The equipment that the exercise requires.
 *                   target:
 *                     type: string
 *                     description: The muscle that the exercise targets.
 *                   gifUrl:
 *                     type: string
 *                     description: The URL of the GIF that demonstrates the exercise.
 *       404:
 *         description: No exercises found for the specified equipment.
 *       500:
 *         description: Internal server error.
 *     tags:
 *      - Equipment
 */
router.get("/exercises/equipment/:equipment", exerciseByEquipment);

/**
 * @swagger
 *  /api/exercises/equipmentList:
 *   get:
 *     summary: Get a list of all equipment used in exercises
 *     description: Returns an array of strings representing all equipment used in exercises.
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of equipment strings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example:
 *                   - Dumbbells
 *                   - Barbell
 *                   - Cable Machine
 *     tags:
 *      - Equipment
 */
router.get("/exercises/equipmentList", equipmentList); // list all the equipments in an array

module.exports = router;
