import ResearchInput from "../Models/ResearchInput.js";
import PollutantKinetics from "../Models/PollutantKinetics.js";

export const submitResearch = async (req, res) => {
  try {
    const input = await ResearchInput.create({
      ...req.body,
      user: req.user.id,
    });
    res.json(input);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const reviewResearch = async (req, res) => {
  try {
    const { status } = req.body; // approved/rejected
    const research = await ResearchInput.findById(req.params.id);
    if (!research) return res.status(404).json({ error: "Not found" });

    research.status = status;
    await research.save();

    if (status === "approved") {
      await PollutantKinetics.create(research.toObject());
    }

    res.json(research);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
