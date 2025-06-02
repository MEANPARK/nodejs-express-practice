const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

// @desc Get all contacts
// @route GET /contacts

const getAllContacts = asyncHandler(async (req, res) => {
  // 전체 연락처 보기
  const contacts = await Contact.findAll();
  res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /contacts
const createContact = asyncHandler(async (req, res) => {
  // 새 연락처 추가하기
  try {
    const { name, email, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "이름과 전화번호는 필수입니다." });
    }

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // 연락처 상세 보기
  const contact = await Contact.findByPk(req.params.id);

  if(!contact) {
    return res.status(404).json({message: "연락처를 찾을 수 없습니다."});
  }

  res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  // 연락처 수정하기
  const contact = await Contact.findByPk(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: "연락처를 찾을 수 없습니다." });
  }

  await contact.update(req.body);
  res.status(200).json(contact);
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  // 연락처 삭제하기
  const contact = await Contact.findByPk(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: "연락처를 찾을 수 없습니다." });
  }

  await contact.destroy();
  res.status(200).json({ message: "연락처가 삭제되었습니다." });
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};