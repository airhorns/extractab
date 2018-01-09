# frozen_string_literal: true
module TabOperator
  TRANSFORMS = [ChordTransform, ChordDefinitionTransform, TabStaffTransform, TabSectionsTransform]

  def self.parse_and_transform_tab(tab_string)
    parsed = GuitarTabParser.new.parse(tab_string)
    TRANSFORMS.reduce(parsed) { |tree, transform| transform.new.apply(tree) }
  end
end
