const Feedback = require('../model/Help&Support'); // Renamed from Help&Support for safety

module.exports.feedback = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(req.userId);
    
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    const newFeedback = await Feedback.create({
      userId,
      subject,
      message
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      data: newFeedback
    });

  } catch (error) {
    console.error('Error adding Feedback Information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
