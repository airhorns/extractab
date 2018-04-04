require 'test_helper'

class Api::TabsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_tab = api_tabs(:one)
  end

  test "should get index" do
    get api_tabs_url
    assert_response :success
  end

  test "should get new" do
    get new_api_tab_url
    assert_response :success
  end

  test "should create api_tab" do
    assert_difference('Api::Tab.count') do
      post api_tabs_url, params: { api_tab: {  } }
    end

    assert_redirected_to api_tab_url(Api::Tab.last)
  end

  test "should show api_tab" do
    get api_tab_url(@api_tab)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_tab_url(@api_tab)
    assert_response :success
  end

  test "should update api_tab" do
    patch api_tab_url(@api_tab), params: { api_tab: {  } }
    assert_redirected_to api_tab_url(@api_tab)
  end

  test "should destroy api_tab" do
    assert_difference('Api::Tab.count', -1) do
      delete api_tab_url(@api_tab)
    end

    assert_redirected_to api_tabs_url
  end
end
