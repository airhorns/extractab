require 'test_helper'

class GuitarTabParserFixtureTest < ActiveSupport::TestCase
  setup do
    @parser = GuitarTabParser.new
  end

  Dir[Rails.root.join('test', 'fixtures', 'files', 'tabs', '*.txt')].each do |tab_file|
    test "it parses tab fixture #{File.basename(tab_file)} without exceptions" do
      tab = File.read(tab_file)
      begin
        @parser.parse(tab)
      rescue Parslet::ParseFailed => error
        puts error.parse_failure_cause.ascii_tree
        raise
      end
    end
  end
end
