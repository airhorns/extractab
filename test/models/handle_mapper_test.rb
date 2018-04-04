require 'test_helper'

class HandleMapperTest < ActiveSupport::TestCase
  test "roundtripping numbers through the mapper" do
    assert_equal 10, HandleMapper.decode(HandleMapper.encode(10))
    assert_equal 100, HandleMapper.decode(HandleMapper.encode(100))
    assert_equal 100000, HandleMapper.decode(HandleMapper.encode(100000))
  end
end
