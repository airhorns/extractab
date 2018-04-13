require 'test_helper'

class Api::TabsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tab = tabs(:one)
  end

  test "should create api_tab" do
    assert_difference('Tab.count') do
      post api_tabs_url, params: { tab: { contents: "foobar", title: "" } }
    end

    assert_response :created
  end

  test "should show api_tab" do
    get api_tab_url(handle: @tab)
    assert_response :success
  end

  test "should allow update if the session is the creator" do
    post api_tabs_url, params: { tab: { contents: "foobar", title: "" } }
    assert_response :created
    handle = JSON.parse(@response.body)["handle"]

    patch api_tab_url(handle: handle), params: { tab: { contents: "foobar", title: "baz" } }
    assert_response :success
    assert Tab.find_by_handle(handle).title == "baz"
  end

  test "should not allow update if the session is not the creator" do
    userA = open_session
    userB = open_session

    userA.post api_tabs_url, params: { tab: { contents: "foobar", title: "" } }
    assert_equal 201, userA.response.response_code

    handle = JSON.parse(userA.response.body)["handle"]

    userA.patch api_tab_url(handle: handle), params: { tab: { contents: "foobar", title: "baz" } }
    assert_equal 200, userA.response.response_code
    userB.patch api_tab_url(handle: handle), params: { tab: { contents: "foobar", title: "qux" } }
    assert_equal 401, userB.response.response_code
    assert Tab.find_by_handle(handle).title == "baz"
  end
end
