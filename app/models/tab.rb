class Tab < ApplicationRecord
  validates :contents, presence: true, length: { maximum: 100000 }
  validates :owner_session_key, presence: true

  def self.find_by_handle(handle)
    id = HandleMapper.decode(handle)
    find(id)
  end

  def to_param
    handle
  end

  def handle
    raise "Can't get a handle for an unsaved tab" unless id.present?
    @handle ||= HandleMapper.encode(id)
  end
end
